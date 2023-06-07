function lerp(
    element: {classList: {
      add: (cssClass: string) => void,
      remove: (cssClass: string) => void
    }},
    start: number,
    end: number,
    cssClass: string,
    scrollTop: number
  ) {
  return (scrollTop > start && scrollTop < end
    ? element.classList.add(`${cssClass}`)
    : element.classList.remove(`${cssClass}`));
}

export default lerp;
