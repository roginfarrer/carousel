"use client";

import { CarouselAria } from "./useCarousel";
import { Attributes } from "./utils";

export interface CarouselTabOptions {
  /** An index of a page in the carousel. */
  index: number;
  /** Whether the page is the active, visible page of the carousel. */
  isSelected?: boolean;
}

export interface CarouselTabAria
  extends Readonly<Required<Pick<CarouselTabOptions, "isSelected">>> {
  /** Props for the nav item element. */
  readonly navItemProps: Attributes<"button">;
}

export function useCarouselTab<T extends object>(
  props: CarouselTabOptions,
  state: CarouselAria<T>,
): CarouselTabAria {
  // const itemId = genItemId(state.id, props.index);
  const isSelected = props.isSelected ?? state.activePageIndex === props.index;
  let current = props.index + 1,
    setSize = state.pages.length;
  return {
    navItemProps: {
      "data-carousel-nav-item": props.index,
      role: "tab",
      "aria-label": `Go to item ${current} of ${setSize}`,
      "aria-posinset": current,
      "aria-setsize": setSize,
      "aria-selected": isSelected,
      tabIndex: isSelected ? 0 : -1,
      onClick: () => state.scrollToPage(props.index),
    },
    isSelected,
  };
}