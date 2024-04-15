import discord
from discord.ext import commands
import requests

intents = discord.Intents.default()
intents.message_content = True
intents.message_reactions = True

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'تم تسجيل الدخول كـ {bot.user.name}!')

@bot.event
async def on_message(message):
    if message.author.bot:
        return

    if message.content.startswith('!حديث'):
        query = message.content[6:]
        try:
            response = requests.get(f'https://dorar.net/dorar_api.json?skey={query}')
            data = response.json()

            embed = discord.Embed(
                title='نتائج البحث عن الحديث',
                description=f'عدد النتائج: {len(data)}',
                color=0x0099ff
            )

            for result in data:
                embed.add_field(name=result['title'], value=f"المؤلف: {result['author']}\nالمحقق: {result['editor']}", inline=False)

            await message.channel.send(embed=embed)
        except Exception as e:
            print(f'حدث خطأ: {e}')
            await message.channel.send('حدث خطأ أثناء استرجاع البيانات.')

    if message.content.startswith('!تفسير'):
        query = message.content[7:]
        try:
            response = requests.get(f'https://api.quran.com:443/v4/verses/by_key/{query}')
            data = response.json()

            embed = discord.Embed(
                title='تفسير الآية',
                description=f"الآية: {data['verse_key']}\nالتفسير: {data['text']}",
                color=0x0099ff
            )

            await message.channel.send(embed=embed)
        except Exception as e:
            print(f'حدث خطأ: {e}')
            await message.channel.send('حدث خطأ أثناء استرجاع التفسير.')

    if message.content.startswith('!شرح'):
        query = message.content[5:]
        try:
            response = requests.get(f'https://api.quran.com:443/v4/verses/explanation/{query}')
            data = response.json()

            embed = discord.Embed(
                title='شرح الآية',
                description=f"الآية: {data['verse_key']}\nالشرح: {data['text']}",
                color=0x0099ff
            )

            await message.channel.send(embed=embed)
        except Exception as e:
            print(f'حدث خطأ: {e}')
            await message.channel.send('حدث خطأ أثناء استرجاع الشرح.')

bot.run('MTIxMDk5NzQzNTYxNTE1ODMxMg.GyTpec.es0aQ5oPuWMSnAq2Uit-tPq6uK6KiLRdx0iixQ')

