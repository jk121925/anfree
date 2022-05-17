import React, { useEffect, useState } from "react";
import "./Modal.css"
const Modal = (props) => {  
    const {_modalState,_header, closeModal} = props;
    console.log(props)
    



    return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={ _modalState ? 'openModal modal' : 'modal'}>
        {_modalState ? (
          <section>
            <header>
              {_header}
              <button onClick= {closeModal} className="close">
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

  
  export default Modal;