import { loadSideBar } from "../../utils/loadSideBar";

export const htmlSideBar = async () => {
  const files = await loadSideBar('note/HTML');
  return [
    {
      text: 'HTML记录',
      items: files
    }
  ]
}