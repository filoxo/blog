---
title: have you ever needed to recover files?
date: 2025-06-17
tags: [linux]
---

have you ever catastrophically lost files, and needed to recover them? i've personally had a lot of bad luck with this scenario... too many times. however this time around i learned a lot.

<!-- excerpt-end -->

dear reader, the problem scenario was this: i have a homelab server where i host my personal video files. i share these family home videos and dvd copies i own, using Plex. i've been needing to migrate from one little NUC server to another that has more modern specs. in this process, the external hard drive where these files have been became corrupted an all my video files were no longer visible on the drive.

i discovered this at like 11:30pm and was pretty distraught. i quit for the day and returned back to it the following day...

i found [disk drill](https://www.disk-drill.com/) for mac to have been recommended, so i gave that a whirl. it wasn't until after it finished 6.5 hours later that it prompted me to spent $90 on an upgraded license for this software to recover these files. i was pretty disappointed with the experience and wasn't willing to pay...

i then looked into the options on Linux which my homeserver was already using, though i did have to install the desktop gui since it has previously been a headless server. i also had to source a dedicated mouse and keyboard now that this server has become more of a workstation. (while at it, i also installed retroarch to turn this old server into a retro game console)

i found [many tools while researching](https://help.ubuntu.com/community/DataRecovery) but [autopsy](https://www.sleuthkit.org/autopsy/) was the simplest, which could be installed with a simple snap package. fun fact, this kit is used by law enforcement for data recovery as well as many other functions!

i was worried it wouldn't work well for recovering files as it scanned the disk much faster than disk drill. but i was so relieved when it showed results of my family videos that i could preview and ultimately copy over. i ended up having to buy a second hard drive to migrate the recovered files over to. in the end i'm super excited about getting these files back, restoring my plex, and moving on from this stressful experience. and the lesson i learned (and that i still _won't_ be putting into practice) is BACKUP YOUR DATA!
