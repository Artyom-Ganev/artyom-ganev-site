import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as actions from 'src/actions';
import { BLANK, REL } from 'src/const';
import { AbstractDataContainer } from 'src/container';
import { IAppLoading } from 'src/interface/Actions';
import { IBlog, IBlogItems } from 'src/interface/IBlog';
import { IDataProps } from 'src/interface/IData';
import { ISource } from 'src/interface/ISource';
import IState from 'src/interface/IState';
import { createSource } from 'src/model';
import { DateUtil } from 'src/utils';
import styles from './Blog.module.scss';

interface IProps<TData> extends IDataProps<TData>, IAppLoading {
  blogLoadList: (payload: { items: TData[] }) => void;
}

const DATE_COMPARATOR = (item1: IBlog, item2: IBlog): number => {
  // TODO: Migrate to normal Date format https://github.com/Artyom-Ganev/artyom-ganev-src/issues/83
  const date1 = DateUtil.parseDateFromString(`${item1.year}-${item1.month}-${item1.day}`) || new Date();
  const date2 = DateUtil.parseDateFromString(`${item2.year}-${item2.month}-${item2.day}`) || new Date();
  return date1 < date2 ? 1 : -1;
};

const itemsSelector = createSelector(
  ({ blog }: IState) => blog,
  (blog: { items: IBlogItems }) => Object.values(blog.items)
);

const mapStateToProps = (state: IState): IDataProps<IBlog> => ({ items: itemsSelector(state) });

const actionCreators = {
  appLoading: actions.appLoading,
  blogLoadList: actions.blogLoadList,
};

/**
 * Blog page
 */
class Blog extends AbstractDataContainer<IBlog, IProps<IBlog>> {
  private readonly source: ISource;

  constructor(props: IProps<IBlog>) {
    super(props);
    const { appLoading, blogLoadList } = props;
    this.source = createSource<IBlog>()
      .endpoint('blog')
      .beforeLoad(() => {
        appLoading({ loading: true });
      })
      .afterLoad((data: IBlog[]) => {
        blogLoadList({ items: data });
      })
      .build();
  }

  protected getSource = (): ISource => this.source;

  protected getContent = (blogList: IBlog[]): ReactNode[] =>
    blogList.sort(DATE_COMPARATOR).map(({ id, year, month, day, title, link, linkCaption }: IBlog) => (
      <div key={id} className={styles.itemContainer}>
        <div className={styles.title}>{DateUtil.format(`${year}-${month}-${day}`)}</div>
        <div className={styles.item}>{title}</div>
        {link && (
          <a href={link} target={BLANK} rel={REL} title='Click for details'>
            {linkCaption}
          </a>
        )}
      </div>
    ));
}

export default connect(mapStateToProps, actionCreators)(Blog);