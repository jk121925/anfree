import React, { useEffect, useState } from "react";
import "./Modal.css"
const Modal = (props) => {  
    const {modalState,header,nowStage, modelClose,modelCloseAndGoNext,modelCloseAndGoNext2} = props;
    console.log(props)
    return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={ modalState ? 'openModal modal' : 'modal'}>
        {modalState ? (
          <section>
            <header>
              {header}
              <button onClick= {modelClose} className="close">
                &times;
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
                <button className='prev' onClick={modelClose}>NO</button>
                <button className='next' onClick={modelCloseAndGoNext}>YES</button>
                {/* <button className='next' onClick={(nowStage==0)? modelCloseAndGoNext : modelCloseAndGoNext2}>YES</button> */}
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

  
  export default Modal;