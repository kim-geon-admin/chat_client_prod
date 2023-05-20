import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Box from '@mui/material/Box';
import ChatRoom from './chat_room.js';
import FriendList from './friendList';
import ChattingList from './chat_room_list';
import { useLocation } from 'react-router-dom';
import '../App.css';

export default function IconTabs(props) {
  const location = useLocation(); // useNavigate에서 보낸 데이터를 받을 때 사용
  const [value, setValue] = React.useState(0);
  const [id, setId] = React.useState(location.state.id);
  const [chatRoom, setChatRomm] = React.useState();



  const handleChange = (event, newValue) => {
    console.log(newValue);
    console.log('id : ',id);
    setValue(newValue);
  };

  return (
    <div className="body">
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" variant="fullWidth" >
      <Tab icon={<PhoneIcon />} aria-label="phone" /> 
      <Tab icon={<FavoriteIcon />} aria-label="favorite" />
      <Tab icon={<PersonPinIcon />} aria-label="person" />
     
    </Tabs>
 
    <Box sx={{ height: 1 }} >      
       

        {
          value == 0 && <FriendList userId={id} setTabNumber={setValue} setChatRomm ={setChatRomm} /> ||
          value == 1 && <ChatRoom userId={id} chatRoom={chatRoom} /> ||
          value == 2 && <ChattingList userId={id} setTabNumber={setValue} setChatRomm ={setChatRomm} /> 
         }
    </Box>
    </div>
  );
} 