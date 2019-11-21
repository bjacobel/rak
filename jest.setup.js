import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as config from './config';

Enzyme.configure({ adapter: new Adapter() });

global.projectConfig = config;
