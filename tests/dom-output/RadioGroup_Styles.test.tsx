import React from 'react';

import {
  render,
  screen,
  beforeEach,
  afterEach,
  ID,
  itemStyles,
  CHILD_ID_1,
  CHILD_ID_2,
  CHILD_ID_3,
  CHILD_ID_4,
  CHILD_ID_5,
} from './testUtils';

import { Rating } from '../../src/Rating';

beforeEach();
afterEach();

/* Styles - Parent */

test('Should have default classNames applied', () => {
  const defaultClasses =
    'rar--group rar--dir-x rar--fx-colors rar--pointer rar--has-stroke rar--gap-sm rar--space-sm';

  render(<Rating value={2} limit={3} onChange={() => {}} />);

  const item = screen.queryByTestId(ID);
  expect(item).toHaveClass(defaultClasses, { exact: true });
});

test('Should not have classNames if styling props are disabled', () => {
  const defaultClasses = 'rar--group rar--dir-x rar--pointer rar--has-stroke';

  render(
    <Rating
      value={2}
      limit={3}
      onChange={() => {}}
      transition="none"
      spaceBetween="none"
      spaceInside="none"
    />
  );

  const item = screen.queryByTestId(ID);
  expect(item).toHaveClass(defaultClasses, { exact: true });
});

test('Should have no stroke nor border classNames and no CSS inline vars if not included in itemStyles', () => {
  const defaultClasses = 'rar--group rar--dir-x rar--pointer';

  render(
    <Rating
      value={2}
      limit={3}
      itemStyles={itemStyles}
      onChange={() => {}}
      transition="none"
      spaceBetween="none"
      spaceInside="none"
    />
  );

  const item = screen.queryByTestId(ID);
  expect(item).toHaveClass(defaultClasses, { exact: true });
  expect(item).not.toHaveAttribute('style');
});

test('Should have stroke and border classNames if set in itemStyles', () => {
  const classNames = 'rar--group rar--dir-x rar--pointer rar--has-stroke rar--has-border';

  render(
    <Rating
      value={2}
      limit={3}
      itemStyles={{ ...itemStyles, boxBorderWidth: 20, itemStrokeWidth: 20 }}
      onChange={() => {}}
      transition="none"
      spaceBetween="none"
      spaceInside="none"
    />
  );

  const item = screen.queryByTestId(ID);
  expect(item).toHaveClass(classNames, { exact: true });
});

/* Styles - Child */

const toHaveActiveClassName = (childId: string) => {
  const child = screen.getByTestId(childId);
  expect(child).toHaveClass('rar--box rar--on', { exact: true });
};

const toHaveInactiveClassName = (childId: string) => {
  const child = screen.getByTestId(childId);
  expect(child).toHaveClass('rar--box rar--off', { exact: true });
};

test('If ratingValue equals to n, first n child should have correspondent active className', () => {
  render(<Rating value={3} limit={6} onChange={() => {}} />);

  toHaveActiveClassName(CHILD_ID_1);
  toHaveActiveClassName(CHILD_ID_2);
  toHaveActiveClassName(CHILD_ID_3);

  toHaveInactiveClassName(CHILD_ID_4);
  toHaveInactiveClassName(CHILD_ID_5);
});

test('If ratingValue equals to n, only n child should have correspondent active className if highlightOnlySelected is enabled', () => {
  render(<Rating value={3} limit={6} onChange={() => {}} highlightOnlySelected />);
  toHaveInactiveClassName(CHILD_ID_1);
  toHaveInactiveClassName(CHILD_ID_2);

  toHaveActiveClassName(CHILD_ID_3);

  toHaveInactiveClassName(CHILD_ID_4);
  toHaveInactiveClassName(CHILD_ID_5);
});

test('If ratingValue equals to 0, no child should have active className, wheter or not highlightOnlySelected is enabled', () => {
  const { rerender } = render(<Rating value={0} limit={6} onChange={() => {}} />);

  const toNotHaveActiveClassNames = () => {
    toHaveInactiveClassName(CHILD_ID_1);
    toHaveInactiveClassName(CHILD_ID_2);
    toHaveInactiveClassName(CHILD_ID_3);
    toHaveInactiveClassName(CHILD_ID_4);
    toHaveInactiveClassName(CHILD_ID_5);
  };

  toNotHaveActiveClassNames();

  rerender(<Rating value={0} limit={6} onChange={() => {}} highlightOnlySelected />);

  toNotHaveActiveClassNames();
});
