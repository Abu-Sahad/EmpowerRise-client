import { DataProvider } from '../../../Context/DataContext';
import Donation from './Donation';

const DonationContainer = () => {
    return (
        <DataProvider>
            <Donation/>
        </DataProvider>
    );
};

export default DonationContainer;