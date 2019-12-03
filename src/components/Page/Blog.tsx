import React from 'react';
import IBlog from '../Model/IBlog';
import Source from '../Model/Source';
import LoadingIndicator from '../Navigation/LoadingIndicator';
import { BLANK, REL } from '../Utils/Const';
import DateUtil from '../Utils/Date';
import './Blog.scss';
import Container from './Container';

const DATE_COMPARATOR = (item1: IBlog, item2: IBlog): number => {
   // TODO: Migrate to normal Date format https://github.com/Artyom-Ganev/artyom-ganev-src/issues/83
   const date1 = DateUtil.parseDateFromString(`${item1.year}-${item1.month}-${item1.day}`) || new Date();
   const date2 = DateUtil.parseDateFromString(`${item2.year}-${item2.month}-${item2.day}`) || new Date();
   return date1 < date2 ? 1 : -1;
};

const PAGE_NAME = 'careers';
const BASE_URL = `https://shielded-brushlands-46595.herokuapp.com/career/`;
const source = new Source<IBlog>(PAGE_NAME, BASE_URL);

/**
 * Blog page
 */
export default class Blog extends React.Component {
   public state: { items: IBlog[] } = { items: [] };
   private loaded: boolean = false;

   public componentDidMount() {
      source.getList().then((items: IBlog[]) => {
         this.loaded = true;
         this.setState({ items });
      });
   }

   public render() {
      const content = this.loaded
         ? <div className='flexBox flexColumn'>{this.getItems()}</div>
         : <LoadingIndicator/>;
      return <Container title='Blog' content={content}/>;
   }

   /**
    * Blog items markup
    */
   private getItems() {
      return this.state.items.sort(DATE_COMPARATOR).map((item: IBlog) => {
         return (
            <div key={item.id} className='page-blog__itemContainer'>
               <div
                  className='page-blog__title'>{DateUtil.format(`${item.year}-${item.month}-${item.day}`)}</div>
               <div className='page-blog__item'>{item.title}</div>
               <a href={item.link} target={BLANK} rel={REL}>{item.linkCaption}</a>
            </div>
         );
      });
   }
}
