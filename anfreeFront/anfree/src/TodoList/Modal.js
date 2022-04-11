import React from "react";
import "./Modal.css"
const Modal = (props) => {  
    const {_nextbooleaon,_header} = props;
    // console.log(_stage);
    return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={ _nextbooleaon ? 'openModal modal' : 'modal'}>
        {_nextbooleaon ? (
          <section>
            <header>
              {_header}
              <button className="close">
                &times;
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
              <button className="close">
                close
              </button>
              <button className="go_next">
                  go next!
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