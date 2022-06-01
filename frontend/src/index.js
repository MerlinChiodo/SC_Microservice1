import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

const customTheme = {
    colorScheme: 'dark',
    primaryColor: 'green'
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <MantineProvider theme={customTheme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
            <App />
        </NotificationsProvider>
    </MantineProvider>
);