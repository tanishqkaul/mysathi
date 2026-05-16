import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import {
  openModal, closeModal,
  setEventType, setEventParam, saveEvent, clearEventSave,
  setRewardType, setRewardParam, saveReward, clearRewardSave, closeTierPanel,
  toggleTimeBound, setExpiryDate,
  clearSubmitError,
  createReward,
} from '@/store/slices/gamificationSlice';
import type { EventType, RewardType } from '@/types/gamification';

export function useGamification() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((s: RootState) => s.gamification);

  return {
    state,
    openModal:        () => dispatch(openModal()),
    closeModal:       () => dispatch(closeModal()),
    setEventType:     (t: EventType) => dispatch(setEventType(t)),
    setEventParam:    (k: string, v: string) => dispatch(setEventParam({ key: k, value: v })),
    saveEvent:        () => dispatch(saveEvent()),
    clearEventSave:   () => dispatch(clearEventSave()),
    setRewardType:    (t: RewardType) => dispatch(setRewardType(t)),
    setRewardParam:   (k: string, v: string) => dispatch(setRewardParam({ key: k, value: v })),
    saveReward:       () => dispatch(saveReward()),
    clearRewardSave:  () => dispatch(clearRewardSave()),
    closeTierPanel:   () => dispatch(closeTierPanel()),
    toggleTimeBound:  (e: boolean) => dispatch(toggleTimeBound(e)),
    setExpiryDate:    (d: string) => dispatch(setExpiryDate(d)),
    clearSubmitError: () => dispatch(clearSubmitError()),
    createReward:     () => dispatch(createReward()),
  };
}
