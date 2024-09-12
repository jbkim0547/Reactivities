import { ErrorMessage, Form, Formik } from "formik";
import MyTestInput from "../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from '../../app/stores/Store';
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
                setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color="teal" textAlign='center' />
                    <MyTestInput placeholder="Display Name" name='displayName' />
                    <MyTestInput placeholder="Username" name='username' />
                    <MyTestInput placeholder="Email" name='email' />
                    <MyTestInput placeholder="Password" name='password' type='password' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationError errors={errors.error as unknown as string[]} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} positive content='Register' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})