import { Box, Button, Center, Checkbox, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { MdDelete } from "react-icons/md";
// import { BsFillTrashFill } from "react-icons/bs";
import { createPostSchema, updatePostSchema } from "../modules/posts/posts.schema";
import { createPost, deletePost, getPosts, updatePost } from "../modules/posts/posts.services";
import FormPost from "./component/FormPost";

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
    const isDone = (formData.get("isDone") as string) === "true" ? false : true;

    console.log(id, isDone);

    const validatedData = updatePostSchema.parse({
      id,
      isDone,
    });

    updatePost(validatedData);
  }

  return redirect("/posts");
}

export default function PostIndex() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Box m={"50px"}>
        <Center>
          <Box width={"900px"}>
            <FormPost />
            <Center m={2}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                To Do List
              </Text>
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
                  <Form>
                    <FormControl display="flex" alignItems={"center"}>
                      <FormLabel>Edit</FormLabel>
                      <Input type="text" placeholder={d.title} />
                    </FormControl>
                  </Form>
                  <Form method="PATCH">
                    <Input type="hidden" name="id" value={d.id} />
                    <Button type="submit" bgColor="orange">
                      Submit
                    </Button>
                  </Form>
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
