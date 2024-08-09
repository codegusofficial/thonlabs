'use client';

import useEnvironment from '@/(labs)/_hooks/use-environment';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';

type Props = {
  sessionEnvironment: Environment;
};

export default function PublicKeySettings({ sessionEnvironment }: Props) {
  const { environment, isLoadingEnvironment } = useEnvironment({
    environmentID: sessionEnvironment.id,
  });

  return (
    <Card>
      <div className="grid grid-cols-[19rem_1fr] gap-40">
        <CardHeader description="The public key allows secure retrieval of data from the client.">
          Public Key
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <div className="grid gap-5">
            <InputWrapper>
              <Input
                readOnly
                loading={isLoadingEnvironment}
                value={environment?.publicKey}
                withCopy
                withHide
              />
            </InputWrapper>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-end">
        <Button type="button" size={'sm'}>
          Regenerate
        </Button>
      </CardFooter>
    </Card>
  );
}
