import React, { useState } from 'react';
import './auth.css';
import 'fontsource-roboto';
import { NavLink } from 'react-router-dom';
import { Demo } from './Demo/Demo';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

export const Auth = (props) => {
  const [modal, setModal] = useState({
    modal1: false
  })

  let history = useHistory();

  const sendMsg = async (values) => {
    const url = 'http://localhost:8000/api/auth/sign_in';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      console.log('Успешно: ', JSON.stringify(json));
    } catch (error) {
      console.log('Ошибка');
      console.error('Ошибка: ', error);
    }
  }

  return (
    <div className='auth'>
      <div className={`auth__info`}>
        <div className={`auth__info project__name`}>
          ViewFinder

          {/* <div className={`auth__info__substrate project__name`}></div> */}
        </div>

        <div className={`auth__info__contact__us`}>
          <div className={`auth__info__contact__us phone`}>
            Phone:&nbsp;<a href="tel:+71112223344">+X (XXX) XXX-XX-XX</a>
          </div>
          <div className={`auth__info__contact__us email`}>
            Email:&nbsp; <a href="mailto:servise.soft@somemail.com" target="_blanc">servise.soft@somemail.com</a>
          </div>
          <div className={`auth__info__substrate contact__us`}></div>
        </div>
      </div>
      <div className='auth__wrapper'>

        {/* <Demo
        isOpened={modal.modal1}
        title={'Демонстрационная версия'}
        onDemoClose={() => setModal({
          ...modal, modal1: false
        })}
      >
        <div>
          <p>Добропожаловать на проект ViewFinder</p>
          Вам будет предоставлен доступ к тестовому пользователю
          <p>Описание доступного функционала:</p>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>

          <Formik
            className='formik__demo__submit'
            initialValues={props.state.demo.signInData}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                { sendMsg(values) };
                history.push('/ports');
                setSubmitting(false);
              }, 400);
            }}
          >

            {({ isSubmitting }) => (
              <Form className='auth__demo__submit'>
                <button
                  className='btn btn--primary'
                  type="submit"
                  disabled={isSubmitting}>
                  Начать
                </button>
              </Form>
            )}

          </Formik>
        </div>

      </Demo> */}

        {/* <div className='auth__item'>
        <div className='btn btn--secondary btn--auth' 
          onClick={() => setModal({
          ...modal, modal1: true
        })}>
          DEMO
        </div>
      </div> */}

        <div className='auth__item'>
          <Formik
            className='formik__demo__submit'
            initialValues={props.state.demo.signInData}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                { sendMsg(values) };
                history.push('/ports');
                setSubmitting(false);
              }, 400);
            }}
          >

            {({ isSubmitting }) => (
              <Form className='auth__demo__submit'>
                <button
                  className='btn btn--secondary btn--auth'
                  type="submit"
                  disabled={isSubmitting}
                >
                  DEMO
              </button>
              </Form>
            )}

          </Formik>
        </div>

        <div className='auth__item'>
          <NavLink className='btn btn--primary btn--auth'
            to='/signin'>Sign in</NavLink>
        </div>

        {/* <div className='auth__item'>
        <NavLink className='btn btn--secondary btn--auth'
          to='/signup'>SignUp</NavLink>
      </div> */}
      </div>
    </div>
  );
}