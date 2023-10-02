"use client";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Group, TextInput, Box, Textarea } from "@mantine/core";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { z } from "zod";
import classes from "../../../styles/DropzoneButton.module.css";
import { TrafficCone } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { Demo } from "@/components/Skeleton";

const schema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should have at least 5 letters" })
    .max(15, { message: "Title should max at least 15 letters" })
    .nonempty(),
  type: z
    .string()
    .min(5, { message: "Type Crash should have at least 5 letters" })
    .max(15, { message: "Type Crash should max at least 15 letters" })
    .nonempty(),
  description: z
    .string()
    .min(5, { message: "Type Crash should have at least 5 letters" })
    .max(50, { message: "Type Crash should max at least 50 letters" })
    .nonempty(),
});

export default function ReportRegister() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const createReport = api.report.create.useMutation({
    onSuccess: () => {
      void router.push("/report");
    },
  });
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      title: "",
      type: "",
      description: "",
    },
  });

  const createValues = (values: {
    title: string;
    type: string;
    description: string;
  }) => {
    void createReport.mutateAsync({
      title: values.title,
      type: values.type,
      description: values.description,
    });
  };

  if (session?.user.role !== "user") {
    return null;
  }

  if (status === "loading") {
    return <Demo />;
  }
  return (
    <>
      <div className={classes.wrapper}>
        <Box maw={340} mx="auto">
          <h1 className="mb-8 flex items-center justify-center text-5xl font-bold">
            <TrafficCone color="#ff7d78" width={30} height={20} />
            Create Form Report
          </h1>
          <form
            onSubmit={form.onSubmit((values) => {
              createValues(values);
              form.reset();
            })}
          >
            <TextInput
              label="Report Title"
              placeholder="@ex: Gas Leak Report"
              withAsterisk
              {...form.getInputProps("title")}
            />
            <TextInput
              label="Type of Report"
              placeholder="@ex: Pipe"
              withAsterisk
              {...form.getInputProps("type")}
            />
            <Textarea
              placeholder="maximum 50 characters"
              label="Description"
              autosize
              withAsterisk
              minRows={2}
              {...form.getInputProps("description")}
            />
            <Group justify="flex-start" mt="md">
              <Button type="submit">
                Create <ArrowRight size={25} color="#ff7d78" className="ml-3" />
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </>
  );
}
