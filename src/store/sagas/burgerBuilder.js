import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
import {fetchIngredientsFails, setIngredients} from '../actions/index';

export function* initIngredientsSaga() {
	try {
		const response = yield axios.get('initialIngredients.json');
		yield put(setIngredients(response.data));
	} catch (error) {
		yield put(fetchIngredientsFails());
	}
}
