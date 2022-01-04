letter_freq = "ETAOINSHRDLCUMWFGYPBVKJXQZ"

cipher = input("Enter the ciphertext: ")
cipher = cipher.upper()

key_mapping = {}

total_chars = 0

for c in cipher:
    if c in key_mapping:
        key_mapping[c] += 1
        total_chars += 1
    elif c.isalpha():
        key_mapping[c] = 1
        total_chars += 1


char_freq = list(key_mapping.keys())
char_freq.sort(key=lambda x: key_mapping[x], reverse=True)

print("", "-"*80, "", sep="\n")
print("Character Frequency:\n")
for char in char_freq:
    freq_cent = round(key_mapping[char]/total_chars * 100, 2)
    print(char, "\t", '▓' * round(freq_cent), " ", freq_cent, "%", '\n', sep="")


char_freq = char_freq[:10]
plain_texts = []
for idx, c in enumerate(char_freq):
    diff = ord(c[0]) - ord(letter_freq[idx])
    plain_text = ""
    for char in cipher:
        if char.isalpha():
            plain_text = plain_text + chr(
                ((ord(char) - ord('A') + diff + 26) % 26) + ord('A')
                )
        else:
            plain_text = plain_text + char
    plain_texts.append(plain_text)

print("", "-" * 80, "", sep="\n")
print(f'Top {len(plain_texts)} possible plain texts:')
for idx, p in enumerate(plain_texts):
    print(idx + 1, p, '\n', sep=". ")
