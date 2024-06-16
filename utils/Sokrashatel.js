export default function Sokrashattel({text, length}) {
    if (text && text?.length <= length) {
      return text;
    } else if (text) {
      return text?.slice(0, length) + "..";
    } else return "";
  }