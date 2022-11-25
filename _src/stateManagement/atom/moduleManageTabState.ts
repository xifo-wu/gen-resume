import { atom } from "recoil";

export type ResumeManageTabKeys = 'addResumeModule' | 'editResumeBasic';

const moduleManageTabState = atom<ResumeManageTabKeys>({
  key: 'moduleManageTabState',
  default: 'editResumeBasic'
});

export default moduleManageTabState;
