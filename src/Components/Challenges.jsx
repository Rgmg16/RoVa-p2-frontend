import React, { useContext } from 'react'; // Import useContext
import cx from 'classnames';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useForm, ValidationError } from '@formspree/react';

function Challenges() {
  const { isAuthenticated } = useContext(AuthContext); // Use AuthContext to check authentication state
  const [state, handleSubmit] = useForm("xjvnllnn");

  return (
    <Form action="https://formspree.io/f/xjvnllnn" method="POST" onSubmit={handleSubmit}>
      <Form.Floating className="mb-3 mt-8">
        <Form.Control
          id="floatingInput"
          type="text"
          name="message"
          placeholder="Share your challenge/complaint..."
          required
        />
        <label htmlFor="floatingInput" className="text-green-500">
          Share your challenge/complaint...
        </label>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </Form.Floating>
      <input type="hidden" name="_replyto" value="gumborobert7@gmail.com" />
      {isAuthenticated ? ( // Updated to use isAuthenticated from AuthContext
        <button
          type="submit"
          className={cx(
            'bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded'
          )}
          disabled={state.submitting}
        >
          Submit
        </button>
      ) : (
        <p className="text-red-500">You must be logged in to submit a challenge.</p>
      )}
    </Form>
  );
}

export default Challenges;
