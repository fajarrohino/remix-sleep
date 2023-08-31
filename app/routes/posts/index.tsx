import { Box, Button, Center, Checkbox, FormControl, FormLabel, Input, Text, Heading } from "@chakra-ui/react";
import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { MdDelete } from "react-icons/md";
import { createPostSchema, updateCeklisSchema, updateTitleSchema } from "../modules/posts/posts.schema";
import { createPost, deletePost, getPosts, updateCeklisPost, updateTitlePost } from "../modules/posts/posts.services";
import FormPost from "./component/FormPost";
import { useEffect, useRef } from "react";

export async function loader() {
  return await getPosts();
}
export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === "post") {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const isDone = false;

    const validatedData = createPostSchema.parse({
      title,
      isDone,
    });

    await createPost(validatedData);
  }

  if (request.method.toLowerCase() === "delete") {
    const formData = await request.formData();
    const id = +(formData.get("id") as string);

    await deletePost(id);
  }

  if (request.method.toLowerCase() === "patch") {
    const formData = await request.formData();

    const id = +(formData.get("id") as string);
    const title = formData.get("title") as string;
    const isDone = (formData.get("isDone") as string) === "true" ? false : true;

    console.log(id, isDone);

    if (!title) {
      const validatedData = updateCeklisSchema.parse({
        id,
        isDone,
      });

      await updateCeklisPost(validatedData);
    } else {
      const validatedData = updateTitleSchema.parse({
        id,
        title,
      });

      await updateTitlePost(validatedData);
    }
  }

  return redirect("/posts");
}

export default function PostIndex() {
  const data = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state === "submitting") formRef.current?.reset();
  }, [state]);
  return (
    <>
      <Box m={"50px"}>
        <Center>
          <Box width={"900px"}>
            <FormPost />
            <Center my={"30px"}>
              <Heading fontSize={"3xl"} fontWeight={"bold"}>
                Aktivitas hari ini{" "}
                <Text as={"span"} color={"orange.400"}>
                  Sebelum Tidur
                </Text>
              </Heading>
            </Center>
            {data.map((d) => (
              <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} m={5} key={d.id}>
                <Form method="PATCH">
                  <Input type="hidden" name="id" value={d.id} />
                  <Input type="hidden" name="isDone" value={d.isDone.toString()} />
                  {d.isDone ? (
                    <Button type="submit">
                      <Checkbox size="lg" colorScheme="green" defaultChecked />
                    </Button>
                  ) : (
                    <Button type="submit">
                      <Checkbox size="lg" colorScheme="" defaultChecked />
                    </Button>
                  )}
                </Form>
                <Text fontWeight={"lg"}>{d.title}</Text>
                <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
                  {/* update title */}
                  <Form method="PATCH" ref={formRef}>
                    <FormControl display="flex" alignItems={"center"} gap={2}>
                      <FormLabel>Edit</FormLabel>
                      <Input type="hidden" name="id" value={d.id} />
                      <Input type="text" name="title" placeholder={d.title} />
                      <Button type="submit" bgColor="orange">
                        {state === "submitting" ? "Editing..." : "Edit"}
                      </Button>
                    </FormControl>
                  </Form>
                  {/* delete */}
                  <Form method="DELETE">
                    <Input type="hidden" name="id" value={d.id} />
                    <Button type="submit" bgColor="red">
                      <MdDelete />
                    </Button>
                  </Form>
                </Box>
              </Box>
            ))}
          </Box>
        </Center>
      </Box>
    </>
  );
}
