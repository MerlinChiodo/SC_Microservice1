import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { AcceptLicenseModal } from './components/AcceptLicenseModal';
import { NameChangeModal } from './components/NameChangeModal';
import { AddressChangeModal } from './components/AddressChangeModal';
import { AcceptRequestModal } from './components/AcceptRequestModal';

const customTheme = {
    colorScheme: 'dark',
    primaryColor: 'green'
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <MantineProvider theme={customTheme} withGlobalStyles withNormalizeCSS>
        <ModalsProvider modals={{ acceptLicense: AcceptLicenseModal, nameChange: NameChangeModal, addressChange: AddressChangeModal, acceptRequest: AcceptRequestModal }}>
            <NotificationsProvider>
                <App />
            </NotificationsProvider>
        </ModalsProvider>
    </MantineProvider>
);