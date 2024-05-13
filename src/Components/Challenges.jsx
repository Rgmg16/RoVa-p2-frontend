import React from 'react'
import cx from 'classnames'
import { Form } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';
import Nav from './Nav';


function Challenges() {
  return (
    <Form
      action="https://formspree.io/f/xjvnllnn"
      method="POST"
    >
      <Form.Floating className="mb-3 mt-8">
        <Form.Control
          id="floatingInput"
          type="text"
          placeholder="Share your suggestion..."
        />
        <label htmlFor="floatingInput" className='text-green-500' >Share your challenge/complaint...</label>
      </Form.Floating>
      <input type="hidden" name="_replyto" value="gumborobert7@gmail.com" />
      <button
        type="submit"
        className={cx(
          'bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded',
        )}
      >
        Submit
      </button>

    </Form>
  )
}

export default Challenges