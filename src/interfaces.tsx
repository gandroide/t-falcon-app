export interface ICustomButton {
  text: string;
  onClick?: () => void;
}

export interface INavBarProps {
  expanded: boolean;
  onExpanded: () => void;
}

export interface INavBarExpand {
  expanded: boolean;
}

export interface IMenu {
  salad: string;
  soup: string;
  meet: string;
  fish: string;
  vegetarian: string;
}
