import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { GamificationState, EventType, RewardType } from '@/types/gamification';
import { buildEventLabel, buildRewardLabel, validateEventParams, validateRewardParams } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const initialState: GamificationState = {
  isModalOpen: false,
  event: {
    selectedType: null,
    params: {},
    isSaved: false,
    isDropdownOpen: false,
  },
  reward: {
    selectedType: null,
    params: {},
    isSaved: false,
    isDropdownOpen: false,
    isTierPanelOpen: false,
  },
  timeBound: {
    enabled: false,
    expiryDate: null,
  },
  ui: {
    isSubmitting: false,
    validationErrors: {},
    submitError: null,
    submitSuccess: false,
  },
};

export const createReward = createAsyncThunk(
  'gamification/createReward',
  async (_, { getState, rejectWithValue }) => {
    const state = (getState() as { gamification: GamificationState }).gamification;
    const { event, reward, timeBound } = state;
    if (!event.selectedType || !reward.selectedType) return rejectWithValue('Incomplete');

    const payload = {
      event_type: event.selectedType,
      event_params: event.params,
      event_label: buildEventLabel(event.selectedType, event.params),
      reward_type: reward.selectedType,
      reward_params: reward.params,
      reward_label: buildRewardLabel(reward.selectedType, reward.params),
      is_time_bound: timeBound.enabled,
      expires_at: timeBound.enabled ? timeBound.expiryDate : null,
    };

    try {
      const { data, error } = await supabase.from('rewards').insert(payload).select().single();
      if (error) return rejectWithValue(error.message);
      return data;
    } catch {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(_state) {
      return { ...initialState };
    },

    // Event actions
    setEventType(state, action: PayloadAction<EventType>) {
      state.event.selectedType = action.payload;
      state.event.params = {};
      state.event.isSaved = false;
      state.ui.validationErrors = {};
    },
    setEventParam(state, action: PayloadAction<{ key: string; value: string }>) {
      state.event.params[action.payload.key] = action.payload.value;
      delete state.ui.validationErrors[action.payload.key];
    },
    saveEvent(state) {
      if (!state.event.selectedType) return;
      const errors = validateEventParams(state.event.selectedType, state.event.params);
      if (Object.keys(errors).length > 0) {
        state.ui.validationErrors = { ...state.ui.validationErrors, ...errors };
        return;
      }
      state.event.isSaved = true;
      state.ui.validationErrors = {};
    },
    clearEventSave(state) {
      state.event.isSaved = false;
    },

    // Reward actions
    setRewardType(state, action: PayloadAction<RewardType>) {
      state.reward.selectedType = action.payload;
      state.reward.params = {};
      state.reward.isSaved = false;
      state.reward.isTierPanelOpen = action.payload === 'commission_tier_upgrade';
      state.ui.validationErrors = {};
    },
    setRewardParam(state, action: PayloadAction<{ key: string; value: string }>) {
      state.reward.params[action.payload.key] = action.payload.value;
      delete state.ui.validationErrors[`reward_${action.payload.key}`];
    },
    saveReward(state) {
      if (!state.reward.selectedType) return;
      const errors = validateRewardParams(state.reward.selectedType, state.reward.params);
      if (Object.keys(errors).length > 0) {
        state.ui.validationErrors = { ...state.ui.validationErrors, ...errors };
        return;
      }
      state.reward.isSaved = true;
      state.reward.isTierPanelOpen = false;
      state.ui.validationErrors = {};
    },
    clearRewardSave(state) {
      state.reward.isSaved = false;
      state.reward.isTierPanelOpen = false;
    },
    closeTierPanel(state) {
      state.reward.isTierPanelOpen = false;
      state.reward.selectedType = null;
      state.reward.params = {};
    },

    // Time-bound actions
    toggleTimeBound(state, action: PayloadAction<boolean>) {
      state.timeBound.enabled = action.payload;
      if (!action.payload) state.timeBound.expiryDate = null;
    },
    setExpiryDate(state, action: PayloadAction<string>) {
      state.timeBound.expiryDate = action.payload;
    },

    clearSubmitError(state) {
      state.ui.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReward.pending, (state) => {
        state.ui.isSubmitting = true;
        state.ui.submitError = null;
      })
      .addCase(createReward.fulfilled, (state) => {
        state.ui.isSubmitting = false;
        state.ui.submitSuccess = true;
      })
      .addCase(createReward.rejected, (state, action) => {
        state.ui.isSubmitting = false;
        state.ui.submitError = (action.payload as string) ?? 'Something went wrong.';
      });
  },
});

export const {
  openModal, closeModal,
  setEventType, setEventParam, saveEvent, clearEventSave,
  setRewardType, setRewardParam, saveReward, clearRewardSave, closeTierPanel,
  toggleTimeBound, setExpiryDate,
  clearSubmitError,
} = gamificationSlice.actions;

export default gamificationSlice.reducer;
