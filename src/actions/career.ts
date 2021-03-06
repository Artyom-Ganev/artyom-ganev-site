import { IErrorAction, ILoadCareerListSuccessAction } from 'actions';
import { CareerModel } from 'model';
import { ActionCreator, AnyAction } from 'redux';

export const CAREER_LOAD_LIST = 'CAREER_LOAD_LIST';
export const CAREER_LOAD_LIST_SUCCESS = `${CAREER_LOAD_LIST}_SUCCESS`;
export const CAREER_LOAD_LIST_ERROR = `${CAREER_LOAD_LIST}_ERROR`;

export const careerLoadList: ActionCreator<AnyAction> = (): AnyAction => ({
  type: CAREER_LOAD_LIST,
});

export const careerLoadListSuccess: ActionCreator<ILoadCareerListSuccessAction> = (
  items: CareerModel[]
): ILoadCareerListSuccessAction => ({
  type: CAREER_LOAD_LIST_SUCCESS,
  items,
});

export const careerLoadListError: ActionCreator<IErrorAction> = (error: string): IErrorAction => ({
  type: CAREER_LOAD_LIST_ERROR,
  error,
});
