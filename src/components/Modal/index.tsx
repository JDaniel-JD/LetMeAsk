import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { database } from '../../services/firebase';

import './styles.scss';

  interface Props {
    children: any;
    onClose: any;
  }

  interface Props {
    id?: string;
  }

  type RoomParams = {
    id: string;
  }

const Modal = ({id = 'modal', onClose = () => {}}: Props) => {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const history = useHistory()

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
          endedAt: new Date(),
        })
      
        history.push('/');
      }

    const handleOutsideClick = (e: { target: { id: string; }; }) => {
        if(e.target.id === id) onClose();
    };

    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={() => handleOutsideClick}/>
                <div className="lixeira">
                    <svg width="80" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5.99988H5H21" stroke="#E73F5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#E73F5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="endRoom">Encerrar Sala</h1>
                <p className="textRoom">Tem certeza que deseja encerrar esta sala?</p>
                <div className="bt">
                    <button className="yes" onClick={() => handleEndRoom()}>Sim, encerrar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;