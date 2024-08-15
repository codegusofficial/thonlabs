import { Metadata } from 'next';
import ProjectsList from '@labs/projects/_components/projects-list';
import { Typo } from '@repo/ui/typo';
import { Button } from '@repo/ui/button';
import dynamic from 'next/dynamic';
import Utils from '@repo/utils';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import ServerAuthSessionService from '../_services/server-auth-session-service';
import Container from '@/(labs)/_components/container';

const NewProjectDialog = dynamic(
  () => import('@/(labs)/projects/_components/new-project-dialog'),
  { ssr: false },
);
const Logo = dynamic(() => import('@/_components/logo'), { ssr: false });

export const metadata: Metadata = {
  title: 'Projects',
};

export default function Projects() {
  const session = ServerAuthSessionService.getSession();

  return (
    <>
      <header className="w-full flex py-2 bg-background/[0.8] backdrop-blur-sm z-10 border-b border-collapse">
        <Container className="flex justify-between items-center gap-3">
          <Logo reduced className="h-5" />

          <Avatar size="sm" className="cursor-default select-none">
            <AvatarFallback>
              {Utils.getFirstAndLastInitials(session?.user?.fullName || '')}
            </AvatarFallback>
          </Avatar>
        </Container>
      </header>
      <div className="mb-6 border-b bg-card py-8">
        <Container className="w-full flex items-center justify-between">
          <Typo variant={'h2'}>Projects</Typo>
          <NewProjectDialog trigger={<Button>New Project</Button>} />
        </Container>
      </div>
      <Container className="p-4">
        <ProjectsList />
      </Container>
    </>
  );
}
