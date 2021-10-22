import json
import subprocess

successfulUploads = []
failedUploads = []

with open("./hashes.txt", 'r') as f:
    # hashesFile = json.load(f)
    hashesSplitted = f.read().splitlines()

for line in hashesSplitted:
    lineSplitted = line.split()
    _hash = lineSplitted[0]
    _filename = lineSplitted[1]
    command = ['ipfs', 'pin', 'remote', 'add',
               '--service=pinata', '--name='+_filename, _hash]
    process = subprocess.Popen(
        command, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
    stdout, stderr = process.communicate()
    exit_code = process.wait()
    print('command = ', command)
    print('stdout= ', stdout, ' - stderr= ',
          stderr, ' - exit_code= ', exit_code)
    if exit_code != 0:
        failedUploads.append({
            "_filename": _filename,
            "_hash": _hash
        })


with open('failedUploads.json', 'w') as outfile:
    json.dump(failedUploads, outfile, indent=4)
