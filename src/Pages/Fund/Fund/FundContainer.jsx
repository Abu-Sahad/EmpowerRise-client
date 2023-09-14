//import { DataProvider } from '../../../Context/DataContext';
import { DataProvider } from '../../../Context/DataContext';
import Fund from './Fund';

const FundContainer = () => {
    return (
        <DataProvider>
            <Fund/>
        </DataProvider>
    );
};

export default FundContainer;