import CribIcon from '@mui/icons-material/Crib';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SpaIcon from '@mui/icons-material/Spa';

const ACTIONS = [
    {
        title: 'sleep',
        actionType: 1,
        Icon: CribIcon,
        color: '#4b10a9',
        add: 'add_something'
    },
    {
        title: 'eat',
        actionType: 2,
        Icon: RestaurantMenuIcon,
        color: '#47c869',
        add: 'add_something'
    },
    {
        title: 'diaper',
        actionType: 3,
        Icon: SpaIcon,
        color: '#f4cc1d',
        add: 'add_something'
    },
]

export {
    ACTIONS
}