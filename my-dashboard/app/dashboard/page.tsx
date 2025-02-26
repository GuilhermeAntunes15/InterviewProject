import WeatherWidget from '../../components/WeatherWidget';
import EconomicWidget from '../../components/EconomicWidget';
import CovidWidget from '../../components/CovidWidget';

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <WeatherWidget />
            <EconomicWidget />
            <CovidWidget />
        </div>
    );
}