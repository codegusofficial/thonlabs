'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  UpdateProjectGeneralInfoFormSchema,
  UpdateProjectGeneralInfoFormData,
} from '@labs/projects/_validators/projects-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerScrollArea,
  DrawerContentContainer,
} from '@repo/ui/drawer';
import { Project } from '@labs/_interfaces/project';
import useProject from '../_hooks/use-project';
import { Typo } from '@repo/ui/typo';
import { Label } from '@repo/ui/label';
import DeleteProjectDialog from './delete-project-dialog';

type Props = {
  trigger: React.ReactNode;
  project: Project;
};

export default function ProjectSettingsDrawer({
  trigger,
  project,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const form = useForm<UpdateProjectGeneralInfoFormData>({
    resolver: zodResolver(UpdateProjectGeneralInfoFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();
  const { updateGeneralInfo } = useProject();

  function onSubmit(payload: UpdateProjectGeneralInfoFormData) {
    startSavingTransition(async () => {
      await updateGeneralInfo(project.id, payload);
    });
  }

  function handleReset() {
    form.clearErrors();
    form.setValue('appName', project.appName);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild onClick={handleReset}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Project Settings</DrawerTitle>
          <DrawerDescription>
            You can update the name of <strong>{project.appName}</strong>{' '}
            project.
          </DrawerDescription>
        </DrawerHeader>
        <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className="grid w-full items-center gap-4">
                <InputWrapper>
                  <Label>PID (Project ID)</Label>
                  <Typo>{project.id}</Typo>
                </InputWrapper>
                <InputWrapper>
                  <Input
                    id="appName"
                    inputSize="lg"
                    label="Project Name"
                    maxLength={25}
                    error={form.formState.errors.appName?.message}
                    {...form.register('appName')}
                  />
                </InputWrapper>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <DeleteProjectDialog
              trigger={<Button variant="ghost">Delete Project</Button>}
              project={project}
            />
            <Button type="submit" loading={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
