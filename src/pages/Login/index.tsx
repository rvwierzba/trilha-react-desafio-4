import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";

// Definição do esquema de validação com Yup
const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "No mínimo 6 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onChange", // Atualiza a validação em cada mudança
    defaultValues,
    reValidateMode: "onChange",
  });

  const onSubmit = (data: IFormLogin) => {
    // Lógica de submissão do formulário
    console.log("Dados do formulário:", data);
  };

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <form onSubmit={onSubmit}>
            <Input
              name="email"
              placeholder="Email"
              control={control}
              errorMessage={errors?.email?.message}
            />
            <Spacing />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              control={control}
              errorMessage={errors?.password?.message}
            />
            <Spacing />
            <Button title="Entrar" type="submit" disabled={!isValid} />
          </form>
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
