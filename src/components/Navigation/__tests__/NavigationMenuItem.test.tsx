import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavigationMenuItem } from 'components/Navigation';
import { PAGES } from 'const';
import { IPageProps } from 'container';
import { shallow } from 'enzyme';
import React from 'react';
import { NavLink } from 'react-router-dom';

describe('NavigationMenuItem', () => {
  const onClick = jest.fn();
  const props: IPageProps = PAGES[0];
  const { name, url } = props;
  const wrapper = shallow(<NavigationMenuItem {...props} onClick={onClick} />);
  const link = wrapper.find(NavLink);

  it('Should render NavLink with correct props', () => {
    expect(link).toHaveLength(1);
    expect(link.prop('exact')).toEqual(!url);
    expect(link.prop('to')).toEqual(`/${url}`);
    expect(link.prop('onClick')).toEqual(onClick);
  });

  it('Should call onCLick', () => {
    link.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should render ListItemIcon', () => {
    const listItemIcon = wrapper.find(ListItemIcon);
    expect(listItemIcon).toHaveLength(1);
  });

  it('Should render ListItemText with correct props', () => {
    const text = wrapper.find(ListItemText);
    expect(text).toHaveLength(1);
    expect(text.prop('primary')).toEqual(name);
  });
});
