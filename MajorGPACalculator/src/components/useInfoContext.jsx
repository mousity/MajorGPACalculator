import InfoContext from "./InfoContext";
import { useContext } from "react";

export default function useInfoContext() {
  return useContext(InfoContext);
}