import React,{useEffect,useState,useRef} from 'react';
import  '../App.css';
import io from 'socket.io-client';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';

const con = {padding:'0'};
const preCss = {color:'red',float:'right'};
//const socket =  io.connect('https://nodechatserver.nayaguny.repl.co');

console.log('socket 초기화');

function Chat_room(props) {

  const [userId, setUserId] = useState(props.userId);
  const [responseChatId, setChatId] = useState();
  const [msg, setMsg] = useState({});
  const [chat, setChat] = React.useState([]);
  const [chatList, setchatList] = useState([]);
  const [socket, setSocket] = useState(io.connect('http://localhost:4000'));
  const txtField = useRef();
  
  
/** socket io의 경우 [] 최초 실행으로 할경우 
 *  usetState 값은 초기값으로 설정한다
 */
  useEffect(()=>{
    console.log('수행1');
    console.log('props member: ',props.member);
    console.log('props chatRoom num : ',props.chatRoom[0]);
   
    socket.emit('enter_room', props.chatRoom[0].room_id ,()=>console.log(`${props.chatRoom[0].room_id}번 입장`));

    socket.on('message',(msgObj)=>{
    //  setChat([...chat,message]);
      setMsg(msgObj);
    //  setChatId(msgObj.id);
   //  setChat(message => [...chat, message]);
    // ad(message); 
      console.log('수행',userId);
    
  
  });
    return () => socket.disconnect();

  },[]);



  useEffect(() => {
    console.log('rendering',msg);
    console.log('rendering msg',msg.message);

    if(msg.message !== '' && msg.message !== undefined){
      setChat([...chat,msg]);

     //setchatList(chatList);
     //console.log(chatList);

    // setMsg({});
    window.scrollTo({
      top: 350,
      behavior: "smooth"
    });
    } 
  }, [msg]);

  
  const getTxtField = (e) => {
  //   console.log(e.target.value);
      //setMsg(e.target.value);
    
  }

    const send = (e) => {
       
    let msgObj = {
      message : txtField.current.children[0].children[0].value,
      room_id : props.chatRoom[0].room_id ,
      id : userId
    }
      //txtField.current.children[0].children[0].value
     

      socket.emit('message', msgObj);
      txtField.current.children[0].children[0].value='';
    //  e.preventdefault();
    
  }

  const listRender = () => {
    console.log(chat);
 

     return chat.map((chat,index) => {

          //if (chat.id === userId) {
            if (chat.id !== userId) {
              return (
              <ListItem key={index}>
              <ListItemAvatar sx={{  width: '0vh' }}>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
                    <pre style={preCss}>{chat.message}</pre>
                  {/* <pre  className="preCss">{chat}</pre> */}

              </ListItem>
              )
          }else{ 
             return (
            <ListItem key={index}>
              <ListItemText 
              sx={{ textAlign: 'right' }}> 
              <pre style={preCss}>{chat.message}</pre>
              </ListItemText>
            </ListItem>
            )
          }
        }
     );
  }

  function loadMoreItems(event) {
    if (event.target.scrollTop === event.target.scrollHeight) {
     //user is at the end of the list so load more items
    } 
    console.log(event.target.scrollTop);
  }
  
  return (
    <>
      <CssBaseline />
      <Container style={con} maxWidth="false">
        <Box sx={{ bgcolor: '#cfe8fc', height: '65vh' ,  overflow: 'auto' }} onScroll={loadMoreItems}>
             <List sx={{  height: '65vh' }}   onScroll={loadMoreItems}>
                    {listRender()}
             </List>

        </Box>

        <Box sx={{  height: '27vh' ,  display: 'flex',
           }} >
              <TextField
                  id="outlined-multiline-static"
                  sx = {{width:'85%', height: '25vh' }}
                  multiline
                  rows={6}
                  onChange = {getTxtField}
                  ref={txtField}
                  //defaultValue="Default Value"
            />
            <Button variant="contained"
                sx = {{width:'15%', height: '25vh' }}
              endIcon={<SendIcon />}
                  onClick={send}
              >
              Send
            </Button>

        </Box>
      </Container>
    </>
  );
}

export default Chat_room;