---
title: Install zsh on Mac without homebrew
date: 2016-07-28
layout: Post
tags: mac
---

I'm not a big supporter of Homebrew. It just doesn't solve any problems for me. I have only needed brew for `zsh` and maybe `node` (but for that I could use [`nvm`](https://github.com/creationix/nvm) or [`n`](https://github.com/tj/n)). I don't want to install brew just for those when they can be set up easily. Seems like a lot of overhead just for one function.

That said, I had a lot of trouble finding how to get `zsh` installed without `brew`. Seems like a lot of people have bought into it for what that it offers.

So here's how I installed `zsh` on my machine without brew.

1. Get the source tarball (`zsh-*.tar.gz`) from [zsh.org](http://zsh.sourceforge.net/Arc/source.html)
2. Unpack the file

	```sh
	tar xzf zsh-5.2.tar.gz
	```

3. Build the binary. This will install `zsh` under `/usr/local/bin/zsh`

	```sh
	./configure && make && make test && make install
	```

    - The version of `zsh` that ships on Mac machines is outdated, thus why its necessary to build the binary.
    - You may get an error message saying `install: /usr/local/bin/zsh-5.2: Permission denied`. If so, you will need to `sudo make install` instead.

4. You now have `zsh` installed and working on your system. Begin configuring it by running `zsh` in your terminal; you'll see a series of prompts to enable and disable features to your liking.

5. Next, you'll want to also install [`oh-my-zsh`](https://github.com/robbyrussell/oh-my-zsh). It makes zsh even more awesome by building in additional plugins and themes. This was the install script at the time of this writing.

	```sh
	sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
	```

    - NOTE: you should read the contents of `install.sh` before directly piping it into your shell. Ya know, because security.

6. Customize your heart out! Become familiar with the themes and plugins now available to you. Enable those which you might use most.

7. Make sure everything works. I had exported some paths in my `~/.bash_profile` file, and needed to copy those over to `~/.zshrc`.

    - For some reason, `nvm` was one of those things that I couldn't get to work quite right. I tried adding the paths to the zsh profile, making sure `$NVM_DIR` was correctly set, etc. Reinstalling was the only way I got it to work again.

8. For these changes to persist, you'll have to change your default shell. The easiest is to just access the setting through the UI. You could do this with a terminal command, so Google it.

    - Open "System Preferences"
    - Click on "Users & Groups"
    - Unlock the settings by clicking on the padlock and entering your password.
    - CTRL + Click on your user and select "Advanced options..."
    - Choose `/bin/zsh` from the _Login shell_ dropdown
    - Click OK to complete

## Bonus
Don't let the fun end there. Here's a few more things you can do to further refine your terminal to your liking.

#### Disable 'last login' banner
When I open up the terminal I see a line at the top saying something like

> Last login: Mon Jan 1 12:00:00 on ttys004

This information is not very relevant to me, so I'd rather not see it. Silence this message by simply creating a `.hushlogin` file.

    touch ~/.hushlogin

#### Disable the user banner
You can disable the user banner by simply adding `DEFAULT_USER="yourusername"` to your profile file.
#### Get a better font
I quickly became a fan of the Agnoster theme, but it required patched fonts ([Powerline fonts](https://github.com/powerline/fonts)) to be installed in order to display some of the special characters it uses (eg. git icons). I'm a fan of Source Code Pro, but I've also heard great things about Meslo, Inconsolata, and Terminus.