import React, { useEffect, useState } from "react";
import "./Modal.css"
const Modal = (props) => {  
    const {_modalState,_header, closeModal} = props;
    
    useEffect(()=>{
        if(_modalState){
            let timmer = setTimeout(()=>{closeModal(false)},2000);
        }
    },[_header])



    return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={ _modalState ? 'openModal modal' : 'modal'}>
        {_modalState ? (
          <section>
            <header>
              {_header}
              <button onClick={closeModal} className="close">
                &times;
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
                <button className={_modalState ? 'next' : 'prev'} onClick={closeModal}>
                    {_modalState ?
                    (
                        <div>next</div>
                    ) : (
                        <div>prev</div>
                    )}

                </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };



// function Modal(props) {
//     const { message } = props;
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           position: "initial",
//           bottom: 30,
//           left: 0,
//           width: 1000,
//           height: 50,
//         }}
//       >
//         <div
//           style={{
//             width: "30%",
//             textAlign: "center",
//             borderRadius: 30,
//             background: "grey",
//             fontSize: 20,
//           }}
//         >
//           <p>{message}</p>
//         </div>
//       </div>
//     );
//   }
  
  export default Modal;