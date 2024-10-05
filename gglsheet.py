import gspread
from google.oauth2.service_account import Credentials
import pandas as pd


class Google_Sheets:
    def __init__(self):
        scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
        creds = Credentials.from_service_account_file('credentials.json', scopes=scope)
        self.client = gspread.authorize(creds)
        
    def get_sheet(self):
        self.sheet = self.client.open_by_key("1wtlRVGMNgzQITTtrRT37rBdoVz1e9zYgU6o1Wa17fr4").sheet1

        data = self.sheet.get_all_values()
        self.df = pd.DataFrame(data[1:], columns=data[0])
        
    def write(self,data):
        self.df[len(self.df)] = data
        self.sheet.clear()
        self.sheet.update([self.df.columns.values.tolist()] + self.df.values.tolist())