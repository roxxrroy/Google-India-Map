import { useSelector } from 'react-redux';
import { getAllData } from '../redux/api/slices/diseaseSlice';

//Access allDisease data from the Redux store using useSelector
const useALLData = () => useSelector(getAllData);

export { useALLData };
