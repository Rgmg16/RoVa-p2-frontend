import React from 'react';
import { Form } from 'react-bootstrap';
import cx from 'classnames';
import useAuth from './Custom Hooks/Useauth';

function Suggestions() {
  const { isLoggedIn } = useAuth();

  return (
    <Form action="https://formspree.io/f/xbjnwwne" method="POST">
      <Form.Floating className="mb-3 mt-8">
        <Form.Control
          id="floatingInput"
          type="text"
          placeholder="Share your suggestion..."
          required
        />
        <label htmlFor="floatingInput" className="text-green-500">
          Share your suggestion/solution...
        </label>
      </Form.Floating>
      <input type="hidden" name="_replyto" value="gumborobert7@gmail.com" />
      {isLoggedIn ? (
        <button
          type="submit"
          className={cx(
            'bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded'
          )}
        >
          Submit
        </button>
      ) : (
        <p className="text-red-500">You must be logged in to submit a suggestion.</p>
      )}
    </Form>
  );
}

export default Suggestions;
