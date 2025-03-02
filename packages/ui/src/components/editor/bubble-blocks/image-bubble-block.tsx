import { useCallback, useEffect, useRef } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from '../../command';
import { Typo } from '../../typo';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { useEditor } from 'novel';
import { Globe as GlobeIcon, Image as ImageIcon } from 'lucide-react';
import { ButtonIcon } from '../../button-icon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const imageFormSchema = z.object({
  href: z.string().url({ message: 'Please enter a valid URL' }),
});
type ImageFormData = z.infer<typeof imageFormSchema>;

export function ImageBlock() {
  const { editor } = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<ImageFormData>({
    defaultValues: {
      href: '',
    },
    mode: 'onChange',
    resolver: zodResolver(imageFormSchema),
  });
  const formHref = form.watch('href');

  if (!editor) {
    return null;
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const setImageOnEditor = useCallback(
    (url: string) => {
      if (!editor) {
        return;
      }

      editor.chain().focus().setImageSource(url).run();

      form.setValue('href', '');
    },
    [editor, form],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonIcon
          type="button"
          variant={'ghost'}
          icon={ImageIcon}
          size={'sm'}
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-52 p-0 rounded-md bg-muted border border-foreground/[0.07]">
        <Command className="bg-transparent" shouldFilter={false}>
          <CommandInput
            placeholder="Enter or paste the URL"
            onValueChange={(value) => {
              form.setValue('href', value, {
                shouldValidate: true,
              });
            }}
          />
          <CommandList>
            {formHref && (
              <CommandGroup>
                <>
                  <CommandItem
                    className="items-start data-[selected='true']:bg-foreground/10"
                    onSelect={() => {
                      setImageOnEditor(form.getValues('href'));
                    }}
                  >
                    <GlobeIcon className="mr-2 mt-0.5 h-4 w-4" />
                    <div className="flex flex-col">
                      <Typo variant={'sm'} className="max-w-40 truncate">
                        {formHref}
                      </Typo>
                      <Typo variant={'mutedXs'}>
                        {form.formState.errors.href
                          ? form.formState.errors.href?.message
                          : 'Show an image from this URL'}
                      </Typo>
                    </div>
                  </CommandItem>
                </>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
