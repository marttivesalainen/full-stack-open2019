# TODO

Testit toimivat, mutta react-dom-development heittää herjan:

> Warning: An update to App inside a test was not wrapped in act(...).

> When testing, code that causes React state updates should be wrapped into act(...):

>      act(() => {
>        /* fire events that update state */
>      });
>      /* assert on the output */
>
>      This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
>          in App (at App.test.js:14)
