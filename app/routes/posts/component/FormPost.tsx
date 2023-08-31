import { Button, FormControl, Input } from "@chakra-ui/react";
import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function FormPost() {
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state === "submitting") formRef.current?.reset();
  }, [state]);
  return (
    <>
      <Form method="post" ref={formRef}>
        <FormControl display={"flex"} gap={3}>
          <Input type="text" name="title" autoFocus />
          <Button type="submit" colorScheme="whatsapp" bgColor={"green"}>
            {state === "submitting" ? "Adding..." : "Add"}
          </Button>
        </FormControl>
      </Form>
    </>
  );
}
