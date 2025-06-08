import TranslatableText from "./TranslateableText";

function Content({ children, type = "translate" }) {
  if (type === "translate")
    return <TranslatableText>{children}</TranslatableText>;
}

export default Content;
