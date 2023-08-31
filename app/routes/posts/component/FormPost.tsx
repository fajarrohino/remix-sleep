import { Form } from "@remix-run/react";
import { Button, FormControl, Input } from "@chakra-ui/react";

export default function FormPost() {
  return (
    <>
      <Form method="post">
        <FormControl display={"flex"} gap={3}>
          <Input type="text" name="title" autoFocus />
          <Button type="submit" colorScheme="whatsapp" bgColor={"green"}>
            add
          </Button>
        </FormControl>
      </Form>
    </>
  );
}
